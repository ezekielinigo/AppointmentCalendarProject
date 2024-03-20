import * as React from 'react';
import { GridColumnHeaderParams } from '@mui/x-data-grid';
import type { GridBaseColDef } from '@mui/x-data-grid/internals';
declare function GridAggregationHeader(props: GridColumnHeaderParams & {
    renderHeader: GridBaseColDef['renderHeader'];
}): React.JSX.Element | null;
export { GridAggregationHeader };
