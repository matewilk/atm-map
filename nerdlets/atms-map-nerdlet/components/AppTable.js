import React from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell,
  Checkbox,
  Grid,
  GridItem,
} from "nr1";
import { connect } from "react-redux";

import { setFilterValue } from "../actions";

class AppTable extends React.Component {
  render() {
    const { incidents, setFilterValue } = this.props;

    return (
      <div>
        <Grid style={{ padding: "15px" }}>
          <GridItem columnSpan={3}>
            <Checkbox
              label="Available (1)"
              value={1}
              onChange={setFilterValue}
              defaultChecked
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <Checkbox
              label="Malfunction (2)"
              value={2}
              onChange={setFilterValue}
              defaultChecked
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <Checkbox
              label="In Service (3)"
              value={3}
              onChange={setFilterValue}
              defaultChecked
            />
          </GridItem>
          <GridItem columnSpan={3}>
            <Checkbox
              label="Unavailable (9)"
              value={9}
              onChange={setFilterValue}
              defaultChecked
            />
          </GridItem>
        </Grid>
        <Table items={incidents}>
          <TableHeader>
            <TableHeaderCell value={({ item }) => item.name} width="50%">
              Name
            </TableHeaderCell>
            <TableHeaderCell value={({ item }) => item.long}>
              Long
            </TableHeaderCell>
            <TableHeaderCell value={({ item }) => item.lat}>
              Lat
            </TableHeaderCell>
            <TableHeaderCell value={({ item }) => item.state}>
              Status
            </TableHeaderCell>
          </TableHeader>

          {({ item }) => (
            <TableRow>
              <TableRowCell>{item.name}</TableRowCell>
              <TableRowCell>{item.long}</TableRowCell>
              <TableRowCell>{item.lat}</TableRowCell>
              <TableRowCell>{item.state}</TableRowCell>
            </TableRow>
          )}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

const mapDispatchToProps = (dispatch) => ({
  setFilterValue: (event) =>
    dispatch(setFilterValue(event.target.value, event.target.checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
