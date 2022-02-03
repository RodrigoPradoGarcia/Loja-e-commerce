
class Mock
{
    static async getAdminToken()
    {
        let result = await fetch("http://localhost:5000/authentication/token",{method:'POST',headers:{"Authorization":"Basic YWRtaW46c2VuaGFzZW5oYUAxMjM="}});
        let token = await result.text();
        return token;
    }

    static async getAllUsers(pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/users?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = result.json();
        return obj;
    }

    static async getSpecificUser(uuid)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/users/${uuid}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = await result.json();
        return obj[0];
    }

    static async postUser(user)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/users`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(user)});
        let txt = await result.text();
        return txt;
    }

    static async putUser(user)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/users/${user.uuid}`,{method:"PUT",headers:{"Content-type":"application/json",'Authorization':`Bearer ${token}`},body:JSON.stringify(user)});
        let text = await result.text();
        return text;
    }

    static async deleteUser(user)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/users/${user.uuid}`,{method:"DELETE",headers:{'Authorization':`Bearer ${token}`}});
        let text = await result.text();
        return text;
    }

    static async getCartItems(pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = result.json();
        return obj;
    }

    static async getSpecificCartItem(uuid_user,uuid_product)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items/${uuid_user}/${uuid_product}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = await result.json();
        return obj[0];
    }

    static async getCartItemsFromUser(uuid_user,pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items/${uuid_user}?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = result.json();
        return obj;
    }

    static async postCartItem(cartItem)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(cartItem)});
        let txt = await result.text();
        return txt;
    }

    static async putCartItem(cartItem)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items/${cartItem.user_uuid}/${cartItem.product_uuid}`,{method:"PUT",headers:{"Content-type":"application/json",'Authorization':`Bearer ${token}`},body:JSON.stringify(cartItem)});
        let text = await result.text();
        return text;
    }

    static async deleteCartItem(cartItem)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/cart_items/${cartItem.user_uuid}/${cartItem.product_uuid}`,{method:"DELETE",headers:{'Authorization':`Bearer ${token}`}});
        let text = await result.text();
        return text;
    }

    static async getAllProducts(pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/products?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = result.json();
        return obj;
    }

    static async getSpecificProduct(uuid)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/products/${uuid}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = await result.json();
        return obj[0];
    }

    static async postProduct(product)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/products`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(product)});
        let txt = await result.text();
        return txt;
    }

    static async putProduct(product)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/products/${product.uuid}`,{method:"PUT",headers:{"Content-type":"application/json",'Authorization':`Bearer ${token}`},body:JSON.stringify(product)});
        let text = await result.text();
        return text;
    }

    static async deleteProduct(product)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/products/${product.uuid}`,{method:"DELETE",headers:{'Authorization':`Bearer ${token}`}});
        let text = await result.text();
        return text;
    }

    static async getAllReviews(pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/reviews?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = result.json();
        return obj;
    }

    static async getSpecificReview(uuid_user,uuid_product)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/reviews/${uuid_user}/${uuid_product}`,{method:"GET",headers:{"Authorization":`Bearer ${token}`}});
        let obj = await result.json();
        return obj[0];
    }

    static async postReview(review)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/reviews`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(review)});
        let txt = await result.text();
        return txt;
    }

    static async putReview(review)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/reviews/${review.user_uuid}/${review.product_uuid}`,{method:"PUT",headers:{"Content-type":"application/json",'Authorization':`Bearer ${token}`},body:JSON.stringify(review)});
        let text = await result.text();
        return text;
    }

    static async deleteReview(review)
    {
        let token  = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/reviews/${review.user_uuid}/${review.product_uuid}`,{method:"DELETE",headers:{'Authorization':`Bearer ${token}`}});
        let text = await result.text();
        return text;
    }

    static async runScript(sql,ps1,sql2,ps2,pagina,itemsPagina)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/script?page=${pagina}&itemsPerPage=${itemsPagina}`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify({script:sql,script2:sql2,paramsScript1:ps1,paramsScript2:ps2})});
        let obj = await result.json();
        return obj;
    }

    static async submitForm(formElement)
    {
        let token = await this.getAdminToken();
        let result = await fetch(`http://localhost:5000/upload/Form`,{method:"POST",headers:{"Authorization":`Bearer ${token}`},body:new FormData(formElement)});
        let txt = await result.text();
        return txt;
    }

    static async deletePhoto(path)
    {
        let token = await this.getAdminToken();
        let result = await fetch("http://localhost:5000/photo",{method:"DELETE",headers:{'Access-Control-Allow-Origin':'*',"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(path)});
        let txt = await result.text();
        return txt;
    }

    static async postPhoto(formElement)
    {
        let token = await this.getAdminToken();
        let result = await fetch("http://localhost:5000/photo",{method:"POST",headers:{"Authorization":`Bearer ${token}`},body:new FormData(formElement)});
        let txt = await result.text();
        return txt;
    }
}

export default Mock;