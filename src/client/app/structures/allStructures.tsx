import * as React from 'react';
import * as Radium from 'radium';
import { Structure } from 'models/structure.model';
import structureStyles from './structure.styles';
import { fromNullable } from 'utils/functions';

interface Props {
  structs: Structure[];
}

const structure = (struct: Structure) =>
  <div style={structureStyles.struct} key={struct._id}>
    <div style={structureStyles.info}>{struct.name}</div>
    <div style={structureStyles.info}>{struct.description}</div>
    <div style={structureStyles.info}>
      Entries: {fromNullable(struct.count).fold(
        (e: any) => 'Error',
        (count: number) => count
      )}
    </div>
  </div>;

const AllStructures = (props: Props) => (
  <div style={structureStyles.structsContainer}>
    {fromNullable(props.structs)
       .fold((e: any) => "An Error Occured",
             (x: Structure[]) => !x.length ?
                "Loading" :  x.map(y => structure(y)))
    }
  </div>
);

export default Radium(AllStructures);
