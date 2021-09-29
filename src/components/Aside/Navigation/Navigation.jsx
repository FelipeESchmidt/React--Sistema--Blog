import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { navSelected } from '../../../store/Navigation/Navigation.selectors';
import { toggleNav } from '../../../store/Navigation/Navigation.actions';

import { Tab, Tabs } from '@material-ui/core';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    tabs: {
        maxHeight: "500px"
    }
}));

function Navigation() {

    const classes = useStyles();

    const dispatch = useDispatch();
    const navValue = useSelector(navSelected);

    const categorias = [
        {
            name: 'React',
            path: 'react',
        },
        {
            name: 'Redux',
            path: 'redux',
        },
        {
            name: 'Compasso',
            path: 'compasso',
        },
    ];

    function handleChange(event, newValue) {
        dispatch(toggleNav(newValue));
    }

    return (
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={navValue}
            onChange={handleChange}
            aria-label="Categorias do Blog"
            indicatorColor="primary"
            className={classes.tabs}
        >
            <Tab icon={<HomeOutlinedIcon />} label="Home" />
            {categorias.map((categoria, index) =>
                <Tab key={index} label={categoria.name} icon={<LocalOfferOutlinedIcon />} />
            )}
        </Tabs>
    );
}

export default Navigation;