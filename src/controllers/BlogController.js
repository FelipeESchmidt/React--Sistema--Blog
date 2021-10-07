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

    dateHelper(info, size) {
        let infoBetter = "0" + info;
        return infoBetter.substr(size * -1);
    }

    dateTransform(timestamp) {
        const date = new Date(timestamp);
        const day = this.dateHelper(date.getDay(), 2);
        const month = this.dateHelper(date.getMonth(), 2);
        const year = this.dateHelper(date.getFullYear(), 4);
        const hours = this.dateHelper(date.getHours(), 2);
        const minutes = this.dateHelper(date.getMinutes(), 2);
        const seconds = this.dateHelper(date.getSeconds(), 2);
        const formatedDate = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        return formatedDate;
    }

    limitText(text, limiter) {
        return text.slice(0, limiter) + (text.length > limiter ? "..." : "");
    }

}

export default BlogController;