export const types = {
  STORE: 'STORE_DATE_DATA',
  CHANGE_DATE: 'CHANGE_DATE',
};

const changeDate = (date) => ({
  type: types.CHANGE_DATE,
  date,
})

const store = (data) => ({
  type: types.STORE,
  data,
})

export default {
  types,
  changeDate,
  store,
}
