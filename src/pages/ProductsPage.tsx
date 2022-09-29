import React, {useContext} from "react";
import {useProducts} from "../hooks/products";
import {ModalContext} from "../context/ModalContex";
import {IProduct} from "../models";
import {Loader} from "../components/Loader";
import {ErrorMessage} from "../components/ErrorMessage";
import {Product} from "../components/Product";
import {Modal} from "../components/Modal";
import {CreateProduct} from "../components/CreateProduct";

export function ProductsPage(){
    const {products, error, loading, addProduct} = useProducts()
    const {modal, openModal, closeModal} = useContext(ModalContext)

    const createHandler = (product: IProduct) => {
        closeModal()
        addProduct(product)
    }

    return (
        <div className="container mx-auto max-w-2xl pt-5">
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            {products.map(product => <Product product={product} key={product.id}/>)}
            {modal && <Modal title="Create new product" onClose={closeModal}>
                <CreateProduct onCreate={createHandler}/>
            </Modal>}
            <button
                className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-2.5 py-0.5"
                onClick={openModal}
            >
                +
            </button>
        </div>
    );
}