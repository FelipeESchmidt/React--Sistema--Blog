import React from 'react';
import { Tab, Tabs, Button } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { AddBox as Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "300px",
        height: "100%",
        backgroundColor: theme.palette.grey[200],
        textAlign: "center"
    },
    title: {
        paddingBottom: "1.3em",
        fontSize: "2.8em",
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: "Birthstone, cursive",
        color: "#212121",
        borderBottom: `2px solid ${theme.palette.grey[500]}`
    },
    tabs: {
        maxHeight: "500px"
    },
    criarCategoria: {
        width: "100%",
        marginTop: "0.5em",
        padding: "0.5rem"
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: "1.3em 0",
        textAlign: "center",
        borderTop: `2px solid ${theme.palette.grey[500]}`
    },
    footer__text: {
        fontSize: "0.8em",
        fontWeight: theme.typography.fontWeightRegular,
        color: "#636363",
    },
    footer__link: {
        fontSize: "0.8em",
        fontWeight: theme.typography.fontWeightRegular,
        color: theme.palette.primary.dark,
        textDecoration: "none"
    }
}));

const theme = createTheme({
    palette: {
        primary: {
            500: "#66bb6a",
        },
    },
});

function Aside() {

    const classes = useStyles();

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <aside className={classes.root}>
            <h1 className={classes.title}>Blog FS</h1>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Categorias do Blog"
                indicatorColor="primary"
                className={classes.tabs}
            >
                <Tab label="Home" />
                {categorias.map(categoria =>
                    <Tab label={categoria.name} />
                )}
            </Tabs>
            <ThemeProvider theme={theme}>
                <Button className={classes.criarCategoria}
                    variant="outlined"
                    color="primary"
                    startIcon={<Add/>}
                >
                    Nova Categoria
                </Button>
            </ThemeProvider>
            <footer className={classes.footer}>
                <p className={classes.footer__text}>Created by Felipe Schmidt</p>
                <a className={classes.footer__link} target="blank" href="https://www.github.com/FelipeESchmidt">Github</a>
            </footer>
        </aside>
    );
}

export default Aside;