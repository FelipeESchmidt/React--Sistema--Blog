class BlogController {

    findNavValue(categorias) {
        let indexFind = -1;
        categorias.forEach((categoria, index) => {
            if (window.location.pathname === "/"+categoria.path) {
                indexFind = index;
            }
        });
        return indexFind;
    }

}

export default BlogController;