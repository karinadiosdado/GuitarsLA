import { useState, useEffect } from "react";
import Header from "./components/Header";
import { db } from "./data/db";
import Guitar from "./components/Guitar";

function App() {
    const [data] = useState(db);
    const [cart, setCart] = useState([]);
    const [total, setTotal]= useState(0);

    function handlerClick(item) {
        const guitarExist = cart.findIndex((guitar) => guitar.id === item.id);

        if (guitarExist >= 0) {
            const updatedCart = [...cart];
            updatedCart[guitarExist].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    useEffect(() => {
        console.log("Componente Listo");
    }, []);

    useEffect(() => {
        console.log("Carrito actualizado:", cart);
        console.log(cart);
    }, [cart]);

   function calcularTotal() {
    return cart.reduce((total, guitar) => {
        return total + (guitar.quantity * guitar.price);
    }, 0);
}

useEffect(() => {
    setTotal(calcularTotal());
}, [cart]);

    return (
        <>
            <Header
            cart={cart}
            total={total}
            />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {data.map((guitar) => (
                        <Guitar
                           key={guitar.id}
                            guitar={guitar}
                            handlerClick={handlerClick}
                            
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
    );
}

export default App;
