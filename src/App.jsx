import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart');
        try {
            const parsed = localStorageCart ? JSON.parse(localStorageCart) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
            console.error("Error al leer el carrito de localStorage:", error);
            localStorage.removeItem('cart');
            return [];
        }
    }

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)); // guarda carrito convertido a string
    }, [cart]);

    const MIN_ITEMS = 1;
    const MAX_ITEMS = 5;

    function addToCart(item) {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id);
        if (itemExist >= 0) {
            if (cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart];
            updatedCart[itemExist] = {
                ...updatedCart[itemExist],
                quantity: updatedCart[itemExist].quantity + 1
            };
            setCart(updatedCart);
        } else {
            const newItem = { ...item, quantity: 1 };
            setCart([...cart, newItem]);
        }
    }
    function decreaseQuantity(id) {
        const updateCart = cart.map(
            (item) => {
                if (item.id === id && item.quantity > MIN_ITEMS) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            })
        setCart(updateCart)
    }
    function increaseQuantity(id) {
        const updateCart = cart.map(
            (item) => {
                if (item.id === id && item.quantity < MAX_ITEMS) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
        setCart(updateCart)
    }
    function removeFromCart(id) {
        setCart(prevcart => prevcart.filter(guitar => guitar.id !== id));

    }
    function clearCart() {
        setCart([])
    }




    return (
        <>
            <Header
                cart={cart}
                decreaseQuantity={decreaseQuantity}
                increaseQuantity={increaseQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
            />




            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (

                        <Guitar
                            key={guitar.id}
                            guitar={guitar}
                            addToCart={addToCart}


                        />



                    ))}

                </div>
            </main>

            <footer className="bg-dark mt-5 py-5">
                <div className="container-xl">
                    <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
                </div>
            </footer>
        </>
    )
}

export default App