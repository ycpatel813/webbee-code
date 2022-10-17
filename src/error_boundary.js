import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
    static getDerivedStateFromError () {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    constructor (props) {
        super(props);
        this.state = { hasError: false };
    }
  
    componentDidCatch (error, errorInfo) {
        // You can also log the error to an error reporting service
        //  logErrorToMyService(error, errorInfo);

        // eslint-disable-next-line no-console
        console.log(error, errorInfo);
    }
  
    render () {
        if (this.state.hasError) {
        // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
  
        return this.props.children;
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.node
};
