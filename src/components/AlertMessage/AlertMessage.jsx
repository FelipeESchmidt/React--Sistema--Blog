import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { hideMessage } from '../../store/Alert/Alert.actions';
import { alert } from '../../store/Alert/Alert.selectors';

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function AlertMessage() {

    const alertRef = useRef(null);

    const dispatch = useDispatch();

    const alertReducer = useSelector(alert);

    function handleCloseAlert(event, reason) {
        if (reason === 'clickaway') return;
        dispatch(hideMessage());
    };

    return (
        <Snackbar
            open={alertReducer.open}
            autoHideDuration={5000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Alert
                onLoad={alertRef.current = this}
                ref={alertRef}
                onClose={handleCloseAlert}
                severity={alertReducer.type}
            >
                {alertReducer.message}
            </Alert>
        </Snackbar>
    );
}

export default AlertMessage;