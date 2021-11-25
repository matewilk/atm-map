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
  Badge,
  HeadingText,
  Spacing,
} from "nr1";
import { connect } from "react-redux";

import {
  setFilterValue,
  FILTER_TYPE_DEVICE,
  FILTER_TYPE_STATUS,
} from "../actions";

class AppTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
    };
  }

  render() {
    const { incidents, setFilterValue } = this.props;
    return (
      <>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <HeadingText type={HeadingText.TYPE.HEADING_5}>
            Filter by status:
          </HeadingText>
        </Spacing>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Grid>
            <GridItem columnSpan={3}>
              <Checkbox
                label="Available (1)"
                value={1}
                onChange={setFilterValue(FILTER_TYPE_STATUS)}
                defaultChecked
              />
            </GridItem>
            <GridItem columnSpan={3}>
              <Checkbox
                label="Malfunction (2)"
                value={2}
                onChange={setFilterValue(FILTER_TYPE_STATUS)}
                defaultChecked
              />
            </GridItem>
            <GridItem columnSpan={3}>
              <Checkbox
                label="In Service (3)"
                value={3}
                onChange={setFilterValue(FILTER_TYPE_STATUS)}
                defaultChecked
              />
            </GridItem>
            <GridItem columnSpan={3}>
              <Checkbox
                label="Unavailable (9)"
                value={9}
                onChange={setFilterValue(FILTER_TYPE_STATUS)}
                defaultChecked
              />
            </GridItem>
          </Grid>
        </Spacing>

        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <HeadingText type={HeadingText.TYPE.HEADING_5}>
            Filter by device:
          </HeadingText>
        </Spacing>
        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Grid>
            <GridItem columnSpan={3}>
              <Checkbox
                label="KEGA"
                value={"KEGA"}
                onChange={setFilterValue(FILTER_TYPE_DEVICE)}
                defaultChecked
              />
            </GridItem>
            <GridItem columnSpan={3}>
              <Checkbox
                label="BT"
                value={"BT"}
                onChange={setFilterValue(FILTER_TYPE_DEVICE)}
                defaultChecked
              />
            </GridItem>
            <GridItem columnSpan={3}>
              <Checkbox
                label="GAA"
                value={"GAA"}
                onChange={setFilterValue(FILTER_TYPE_DEVICE)}
                defaultChecked
              />
            </GridItem>
          </Grid>
        </Spacing>

        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Badge type={Badge.TYPE.INFO}>{`Total: ${incidents.length}`}</Badge>
        </Spacing>

        <Spacing type={[Spacing.TYPE.MEDIUM]}>
          <Table items={incidents}>
            <TableHeader>
              <TableHeaderCell value={({ item }) => item.name} width="40%">
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
        </Spacing>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { incidents: state.data.filtered };
};

const mapDispatchToProps = (dispatch) => ({
  setFilterValue: (type) => (event) =>
    dispatch(setFilterValue(type, event.target.value, event.target.checked)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppTable);
