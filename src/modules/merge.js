import merge from 'lodash.merge'

const object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
}

const other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
}

merge(object, other)
