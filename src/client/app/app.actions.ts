export interface Action {
  type: string;
  payload: any;
}

export const UPDATE_HEADER = 'UPDATE_HEADER';

export const updateHeader = (heading: React.ComponentClass<{}>) => ({
  type: UPDATE_HEADER,
  payload: heading
});
