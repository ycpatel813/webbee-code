import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    constructor (props) {
        super(props);
        this.state = {
            totalRecords: '',
            pageLimit: '',
            totalPages: '',
            currentPage: '',
            initialPage: '',
            pagesToShow: ''
        };
    }

    componentDidMount () {
        this.setState({
            totalRecords: this.props.totalRecords,
            pageLimit: this.props.pageLimit || 10,
            totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
            pagesToShow: this.props.pagesToShow || 5,
            currentPage: this.props.initialPage || 1
        });
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            totalRecords: nextProps.totalRecords,
            pageLimit: nextProps.pageLimit || 10,
            totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
            pagesToShow: nextProps.pagesToShow || 5
        });
    }

    componentDidUpdate (prevProps, prevState) {
        if (
            this.state.totalRecords !== prevState.totalRecords ||
      this.state.pageLimit !== prevState.pageLimit
        ) {
            this.setPage(this.state.currentPage);
        }
    }

    setPage (page) {
        const { totalRecords, pageLimit, totalPages } = this.state;

        if (page < 1) {
            // eslint-disable-next-line no-param-reassign
            page = 1;
        } else if (page > totalPages) {
            // eslint-disable-next-line no-param-reassign
            page = totalPages;
        }

        this.setState({
            currentPage: page
        });

        const startIndex = (page - 1) * pageLimit;
        const endIndex = Math.min((startIndex + pageLimit - 1), totalRecords - 1);

        this.props.onChangePage({
            pageLimit,
            totalPages,
            page,
            startIndex,
            endIndex
        });
    }

    getPager () {
        let startFromNumber = 0;
        let { pagesToShow } = this.state;
        const { currentPage, totalPages } = this.state;
        const pages = [];

        if (totalPages <= pagesToShow) {
            startFromNumber = 1;
            pagesToShow = totalPages;
        } else if (currentPage <= Math.ceil(pagesToShow / 2)) {
            startFromNumber = 1;
        } else if (
            currentPage + Math.floor((pagesToShow - 1) / 2) >=
        totalPages
        ) {
            startFromNumber = totalPages - (pagesToShow - 1);
        } else {
            startFromNumber = currentPage - Math.floor(pagesToShow / 2);
        }

        for (let i = 1; i <= pagesToShow; i++) {
            pages.push(startFromNumber++);
        }

        return {
            currentPage,
            totalPages,
            pages
        };
    }

    render () {
        if (!this.state.totalRecords || this.state.totalPages === 1) {
            return null;
        }

        const pager = this.getPager();

        return (

            <div className='row'>
                <div className='col-sm-12 col-md-7'>
                    <div className='dataTables_paginate paging_numbers' id='dataTable_paginate'>
                        <ul className='pagination'>
                            <li className={`paginate_button page-item first ${pager.currentPage === 1 ? 'disabled' : ''}`} id='dataTable_previous'>
                                <span className='pointer page-link'
                                    disabled={pager.currentPage === 1}
                                    onClick={() => this.setPage(1)}
                                >
                                    <i className='fas fa-step-backward' aria-hidden='true'></i>
                                </span>
                            </li>
                            <li className={`paginate_button page-item previous ${pager.currentPage === 1 ? 'disabled' : ''}`} id='dataTable_previous'>
                                <span className='pointer page-link'
                                    disabled={pager.currentPage === 1}
                                    onClick={() => this.setPage(pager.currentPage - 1)}
                                >
                                    <i className='fas fa-arrow-left' aria-hidden='true'></i>
                                </span>
                            </li>
                           
                            {pager.pages.map((page, index) => (
                                <li key={index} className= {`paginate_button page-item ${pager.currentPage === page ? 'active' : ''}`}>
                                    <span className='pointer page-link'
                                        onClick={() => this.setPage(page)}
                                    >
                                        {page}
                                    </span>
                                </li>
                            ))}
                            <li className= {`paginate_button page-item next ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <span className='pointer page-link'
                                    onClick={() => this.setPage(pager.currentPage + 1)}
                                >
                                    <i className='fas fa-arrow-right' aria-hidden='true'></i>
                                </span>
                            </li>
                            <li className= {`paginate_button page-item last ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <span className='pointer page-link'
                                    onClick={() => this.setPage(pager.totalPages)}
                                >
                                    <i className='fas fa-step-forward' aria-hidden='true'></i>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageLimit: PropTypes.number,
    initialPage: PropTypes.number,
    pagesToShow: PropTypes.number,
    onChangePage: PropTypes.func
};

export default Pagination;
