import React from "react";
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowCell,
  Spacing,
} from "nr1";
import { connect } from "react-redux";

import { STATE_MAP } from "../actions";

import Filters from "./Filters";
import InfoBadges from "./InfoBadges";

class AppTable extends React.Component {
  render() {
    const { incidents } = this.props;
    return (
      <>
        <Filters />
        <InfoBadges />

        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Table items={incidents}>
            <TableHeader>
              <TableHeaderCell value={({ item }) => item.terminal_id} width={"25%"}>
                Terminal ID
              </TableHeaderCell>
              <TableHeaderCell value={({ item }) => item.manufacturer_id}>
                Manufacturer ID
              </TableHeaderCell>
              <TableHeaderCell value={({ item }) => item.device}>
                Device Type
              </TableHeaderCell>
              <TableHeaderCell value={({ item }) => item.zipcode}>
                Zipcode
              </TableHeaderCell>
              <TableHeaderCell value={({ item }) => item.state}>
                Status
              </TableHeaderCell>
            </TableHeader>

            {({ item }) => (
              <TableRow>
                <TableRowCell>{item.terminal_id}</TableRowCell>
                <TableRowCell>{item.manufacturer_id}</TableRowCell>
                <TableRowCell>{item.device}</TableRowCell>
                <TableRowCell>{item.zipcode}</TableRowCell>
                <TableRowCell>{STATE_MAP[item.state]}</TableRowCell>
              </TableRow>
            )}
          </Table>
        </Spacing>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

export default connect(mapStateToProps)(AppTable);
