import React from 'react';
import { connect } from 'react-redux';
import { myActionName, myActionNameReset } from './actions';

function ExampleComponent(props) {

    const { state } = props;

    const renderTime = new Date();

    return (
        <div>
            <pre>State: {JSON.stringify(state)}</pre>

            <div>
                <button onClick={() => props.myActionName(renderTime)}>Action!</button>
                <button onClick={props.myActionNameReset}>Reset</button>
            </div>
        </div>
    );

}

function mapStateToProps(state) {
    return {
        state: state
    }
}

export default connect(mapStateToProps, { myActionName, myActionNameReset })(ExampleComponent);