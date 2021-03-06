import actionTypes from '../actionTypes';
import update from 'immutability-helper';
import { isType } from 'ts-action';
import {
  fetchMoreDocSuccess,
  initCreatedDocListSuccess,
  fetchDocumentDetailSuccess,
  deleteDocumentSuccess
} from '../actions/doc';

const { ROUTER } = actionTypes;

const defaultState: DocStateInterface = {
  createdDocs: [],
  docDetailMap: {}
};

export function mergeCreatedDocList(
  list1: DocSerializer[],
  list2: DocSerializer[]
): DocSerializer[] {
  if (!list1 || list1.length === 0) {
    return list2 || [];
  }
  if (!list2 || list2.length === 0) {
    return list1 || [];
  }
  const result: DocSerializer[] = [];
  let index1 = 0;
  let index2 = 0;
  while (index1 < list1.length || index2 < list2.length) {
    const node1 = list1[index1];
    const node2 = list2[index2];
    const id1 = node1 ? node1.id : -Infinity;
    const id2 = node2 ? node2.id : -Infinity;
    if (id1 < id2) {
      result.push(node2);
      index2++;
    } else if (id1 === id2) {
      result.push(node1);
      index1++;
      index2++;
    } else {
      result.push(node1);
      index1++;
    }
  }
  return result;
}

export default function doc(state = defaultState, action) {
  if (isType(action, fetchMoreDocSuccess)) {
    return {
      ...state,
      createdDocs: mergeCreatedDocList(state.createdDocs, action.payload.docs)
    };
  }
  if (isType(action, initCreatedDocListSuccess)) {
    return {
      ...state,
      createdDocs: action.payload.createdDocs
    };
  }
  if (isType(action, deleteDocumentSuccess)) {
    return {
      ...state,
      createdDocs: state.createdDocs.filter(o => {
        return o.id !== action.payload.id;
      })
    };
  }
  if (isType(action, fetchDocumentDetailSuccess)) {
    const documentDetail = action.payload.documentDetail;
    const docDetailMap = update(state.docDetailMap, {
      [documentDetail.data.id]: {
        $set: documentDetail
      }
    });
    return {
      ...state,
      docDetailMap
    };
  }
  switch (action.type) {
    case ROUTER.LOGOUT: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
}
