import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import BlogContext from '../../../contexts/BlogContext';
import Loading from '../../Loading';

import { categories } from '../../../store/Categories/Categories.selector';
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
    const categoriasSelector = useSelector(categories);
    const categorias = categoriasSelector.categories;

    const blogHelper = useContext(BlogContext).blogHelper;

    useEffect(() => {
        if (categorias.length) {
            dispatch(toggleNav(blogHelper.findNavValue(categorias)+1));
        }

    }, [categorias, blogHelper, dispatch]);

    function handleChange(event, newValue) {
        if (!categorias[newValue - 1]) {
            history.push('');
        } else {
            history.push("/"+categorias[newValue - 1].path,history.location);
        }
        dispatch(toggleNav(newValue));
    }

    if (categoriasSelector.loading) {
        return <Loading position="middle" padding={1}></Loading>
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