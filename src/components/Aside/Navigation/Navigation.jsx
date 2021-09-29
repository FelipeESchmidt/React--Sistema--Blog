import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import ApiContext from '../../../contexts/ApiContext';
import Loading from '../../Loading';

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

    const history = useHistory();

    const dispatch = useDispatch();
    const navValue = useSelector(navSelected);

    const context = useContext(ApiContext);
    const [categorias, setCategorias] = useState([]);

    
    useEffect(() => {
        setCategorias([]);
        
        context.controller.getCategorias(categorias => {
            setCategorias(categorias);
            dispatch(toggleNav(context.controller.findNavValue()+1));
        });

    }, [context, dispatch]);

    function handleChange(event, newValue) {
        if(!categorias[newValue-1]){
            history.push('');
        }else{
            history.push(categorias[newValue-1].path);
        }
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
            {(!categorias.length)
                ? <Loading position="middle" padding={1}></Loading> :
                categorias.map((categoria, index) =>
                    <Tab key={index} label={categoria.name} icon={<LocalOfferOutlinedIcon />} />
                )
            }
        </Tabs>
    );
}

export default Navigation;