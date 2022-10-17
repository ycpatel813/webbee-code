import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Pagination from './pagination.js';
import '../style/css/dataTable.min.css';

const renderHeading = (columns, enableRowActionBar, onSortChange) => {
    const listHeading = columns.map((key,index) => {
        return (
            <Theader key={index} index={index}
                name={key.headerName}
                width={ key.width || 'auto'}
                field={key.field}
                onSortChange={onSortChange}
                sortable={key.sortable} />
        );
    });

    const actionColumn = enableRowActionBar ? <th scope='col' style={{ minWidth: '20%' }} key='action'>Action</th> : '';

    return (
        <tr key='heading'>
            {listHeading}
            {actionColumn}
        </tr>
    );
};

const Theader = (thProps) => {
    const { index, name, field, sortable, onSortChange, width } = thProps;
    
    const sortableClass = sortable ? 'sorting' : '';
    const [type, setType] = useState('asc');
    const [sortClass, setSortClass] = useState(sortableClass);

    const handeleSorting = (e, column, order) => {
        onSortChange(column,order);

        if(order === 'asc' || order === 'default'){
            setSortClass('sorting_asc');
            setType('desc');
        } else if(order === 'desc') {
            setSortClass('sorting_desc');
            setType('asc');
        }
    };
    const props = {
        scope: 'col',
        key: index,
        className: sortClass ? 'pointer': '',
        style: { width }
    };
    if(sortable){
        const sortKey = typeof sortable === 'boolean' ? field : sortable;
        props.onClick = (e => handeleSorting(e,sortKey,type));
    }
    
    return (
        <th {...props}>
            {name}
            <span className={sortClass}></span>
        </th>
    );
};

const rowFilter = (rows, keywords,searchableKeys) => {
    const allrows = rows;

    if (keywords) {
        const lowSearch = keywords.toLowerCase();

        return rows.filter((row) => {
            return searchableKeys.some(search =>
                String(row[search]).toLowerCase().includes(lowSearch)
            );
        });
    }

    return allrows;
};

const renderBody = (tableProps, filteredRows, state) => {
    const { columns,enableRowActionBar,rowActionBarComponent } = tableProps;
    const { currentPage, pageLimit } = state;
    
    return filteredRows.map((row, index) => {
        const pageIndex = currentPage === 1 ? 1 : (pageLimit* (currentPage-1));
        const rowRender = columns.map((key) => {
            let fieldVal = row[key.field];
            if((key.field).includes(' ')) {
                fieldVal = _.join((_.map(_.split(key.field, ' '), val => {
                    return row[val];
                })), ' ');
            };
            
            // eslint-disable-next-line no-nested-ternary
            const elemVal = (key.field === 'index') ? (pageIndex === 1 ? (index + 1) : pageIndex + (index + 1)) : fieldVal;
            

            return (
                <td key={`${row.id}_${key.field}`}>{elemVal}</td>
            );
        });
        const actionColumn = () => {
            return (enableRowActionBar ? <td>{rowActionBarComponent(row)}</td> : false);
        };

        return (
            <tr key={index}>
                {rowRender}
                {actionColumn()}
            </tr>
        );
    });
};

const renderSearch = (keywords, onKeywordChange, clearSearchText) => {
    return (
        <div className='col-sm-12 col-md-6'>
            <div id='dataTable_filter' className='dataTables_filter'>
                <div>Search:
                    <input type='search' onChange={(e) => onKeywordChange(e)} value={keywords} className='form-control form-control-sm' placeholder='' aria-controls='dataTable' />
                    {keywords && <i className='fa fa-times pointer' onClick={clearSearchText} style={{ position: 'relative', right: '21px' }}></i> }
                </div>
            </div>
        </div>
    );
};

const rednderShowPerPage = (pageLimit,onPageLimitChange) => {
    return(
        <div className='col-sm-12 col-md-6'>
            <div className='dataTables_length' id='dataTable_length'>
                <label>Show&nbsp;&nbsp;
                    <select
                        name='dataTable_length'
                        aria-controls='dataTable'
                        className='custom-select custom-select-sm form-control form-control-sm'
                        value={pageLimit}
                        onChange={e => onPageLimitChange(e)}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select> entries</label>
            </div>
        </div>
    );
};

class Table extends Component {
    constructor (props) {
        super(props);
        this.state = {
            keywords: '',
            totalRecords: '',
            pageLimit: 25,
            totalPages: '',
            currentPage: '',
            initialPage: '',
            pagesToShow: '',
            sortKey: '',
            sortType: ''
        };
    }

    onChangePage = data => {
        this.setState({
            pageLimit: data.pageLimit,
            totalPages: data.totalPages,
            currentPage: data.page,
            startIndex: data.startIndex,
            endIndex: data.endIndex
        });
    };

    render (){
        const { title, columns, enableRowActionBar, createNewRecord } = this.props;
        let { rows } = this.props;
        let rowsPerPage = [];
        const {
            sortKey,
            sortType
        } = this.state;
        
        const searchableKeys = columns.filter(column => column.searchable).map(key => key.field);

        const onKeywordChange = (e) => {
            this.setState({
                keywords: e.target.value
            });
        };

        const clearSearchText = () => {
            this.setState({
                keywords: ''
            });
        };

        const onSortChange = (key,type) => {
            this.setState({
                sortKey: key,
                sortType: type
            });
        };

        const onPageLimitChange = (e) => {
            this.setState({
                pageLimit: parseInt(e.target.value)
            });
        };

        if(this.state.keywords){
            rows = rowFilter(rows,this.state.keywords,searchableKeys);
        }
        
        if(sortKey && sortType) {
            if(sortType === 'asc') {
                rows = _.sortBy(rows, sortKey);
            } else {
                rows = _.sortBy(rows, sortKey).reverse();
            }
        }
        
        rowsPerPage = rows.slice(this.state.startIndex, this.state.endIndex + 1);

        return (
            <div className='col-lg-12'>
                <div className='card'>
                    <div className='header'>
                        <h2><b>{title}</b></h2>
                        <ul className='header-dropdown'>
                            {createNewRecord}
                        </ul>
                    </div>
                    <div className='card-body'>
                        <div className='table-responsive'>
                            <div id='dataTable_wrapper' className='dataTables_wrapper dt-bootstrap4'>
                                <div className='row'>
                                    {rednderShowPerPage(this.state.pageLimit, onPageLimitChange)}
                                    {renderSearch(this.state.keywords, onKeywordChange, clearSearchText)}
                                </div>
                                <div className='row'>
                                    <div className='col-sm-12'>
                                        <table className='table table-hover js-basic-example table-bordered table-sm dataTable table-custom table-striped m-b-0 c_list no-footer' id='dataTable' width='100%' cellSpacing='0'>
                                            <thead>{renderHeading(columns, enableRowActionBar,onSortChange)}</thead>
                                            <tbody>{renderBody(this.props, rowsPerPage, this.state)}</tbody>
                                        </table>
                                    </div>
                                </div>
                                <Pagination
                                    totalRecords={rows.length}
                                    pageLimit={this.state.pageLimit || 5}
                                    initialPage={1}
                                    pagesToShow={5}
                                    onChangePage={this.onChangePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    pageLimit: PropTypes.number,
    initialPage: PropTypes.number,
    pagesToShow: PropTypes.number,
    onChangePage: PropTypes.func,
    title: PropTypes.string,
    rows: PropTypes.array,
    columns: PropTypes.array,
    enableRowActionBar: PropTypes.bool,
    createNewRecord: PropTypes.object

};
export default Table;
