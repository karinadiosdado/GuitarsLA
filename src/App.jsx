import { useState, useEffect } from "react";
import Header from "./components/Header";
import { db } from "./data/db";
import Guitar from "./components/Guitar";


function App() {
    const [data] = useState(db);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Agregar guitarra al carrito
    function handlerClick(item) {
        const guitarExist = cart.findIndex(
            (guitar) => guitar.id === item.id
        );

        if (guitarExist >= 0) {
            const updatedCart = [...cart];
            // Maximo 5 guitarras
            if (updatedCart[guitarExist].quantity < 5) {
                updatedCart[guitarExist].quantity++;
                setCart(updatedCart);

            }
        } else {
            const guitar = {
                ...item,
                quantity: 1
            };
            setCart([...cart, guitar]);
        }
    }
    // Aumentar cantidad
    function aumentarQuantity(id) {
        const updatedCart = cart.map((guitar) => {
            if (guitar.id === id && guitar.quantity < 5) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1
                };
            }
            return guitar;
        });
        setCart(updatedCart);
    }


    // Disminuir cantidad
    function disminuirQuantity(id) {
        const updatedCart = cart
            .map((guitar) => {
                if (guitar.id === id) {
                    return {
                        ...guitar,
                        quantity: guitar.quantity - 1
                    };
                }
                return guitar;
            })
            .filter((guitar) => guitar.quantity > 0);
        setCart(updatedCart);
    }


    // Eliminar una guitarra
    function eliminarCart(id) {
        const updatedCart = cart.filter(
            (guitar) => guitar.id !== id
        );
        setCart(updatedCart);
    }


    // Vaciar carrito
    function VaciarCart() {
        setCart([]);
    }


    // Mostrar carrito actualizado
    useEffect(() => {
        console.log("Carrito actualizado:", cart);
    }, [cart]);


    // Calcular total
    function calcularTotal() {
        return cart.reduce((total, guitar) => {
            return total + (guitar.quantity * guitar.price);
        }, 0);

    }


    // Actualizar total
    useEffect(() => {
        setTotal(calcularTotal());
    }, [cart]);
    return (
        <>
            <Header
                cart={cart}
                total={total}
                aumentarQuantity={aumentarQuantity}
                disminuirQuantity={disminuirQuantity}
                eliminarCart={eliminarCart}
                VaciarCart={VaciarCart}

            />


            <main className="container-xl mt-5">
                <h2 className="text-center">
                    Nuestra Colección
                </h2>
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
                    <p className="text-white text-center fs-4 mt-4 m-md-0">
                        GuitarLA - Todos los derechos Reservados
                    </p>
                </div>
            </footer>
        </>
    );
}


export default App;