class BlogController {
    constructor() {
        this.categorias = [];
        this.posts = [];
    }

    getCategorias(setDado) {
        this.categorias = [
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
        setTimeout(() => setDado(this.categorias), 2000);
    }

    findNavValue() {
        let indexFind = -1;
        this.categorias.forEach((categoria, index, array) => {
            if (window.location.pathname === "/"+categoria.path) {
                indexFind = index;
            }
        });
        return indexFind;
    }

    getPosts(setDado) {
        this.posts = {
            '8xf0y6ziyjabvozdd253nd': {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: 'Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false,
                commentCount: 2,
            },
            '6ni6ok3ym7mf1p33lnez': {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1468479767190,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                voteScore: -5,
                deleted: false,
                commentCount: 0,
            },
        };
        setTimeout(() => {
            return this.posts;
        }, 1000);
    }
}

export default BlogController;