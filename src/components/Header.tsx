import type { CartItems,Guitar } from "../types/types";

type HeaderProps = {
   cart: CartItems[]
   emptyCart : ()=> void
   emptyItem(id: Guitar["id"]): void
   totalP: ()=> number
   reduce: (item:CartItems) => void
   aument: (item:CartItems) => void
}

function Header({ cart, emptyItem, emptyCart, totalP, reduce, aument }: HeaderProps) {
  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {cart.length === 0 ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt="imagen guitarra"
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                onClick={() => reduce(guitar)}
                                type="button"
                                className="btn btn-dark"
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                onClick={() => aument(guitar)}
                                type="button"
                                className="btn btn-dark"
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                onClick={() => emptyItem(guitar.id)}
                                className="btn btn-danger"
                                type="button"
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${totalP()}</span>
                    </p>
                    <button
                      onClick={() => emptyCart()}
                      className="btn btn-dark w-100 mt-3 p-2"
                    >
                      Vaciar Carrito
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
