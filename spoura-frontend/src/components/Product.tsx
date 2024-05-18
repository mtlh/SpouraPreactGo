export default function ProductReusable({product}) {
    return (
        <div class="my-2 hover:scale-105 ease-in-out transition" key={product.id}>
            <a href={"/product/" + product.URLSlug} class="m-auto">
                <div class="card md:h-72 md:w-80 w-[25rem] h-[15rem] bg-center bg-cover m-auto -z-10" style={{ backgroundImage: 'url(' + product.ImgURL + ')'}}>
                    <div class="card-body pb-40">
                        <h2 class="card-title">{product.Name}</h2>
                        {product.Type == "m" &&
                            <div class="badge bg-blue-700 border-0">Mens</div>
                        }
                        {product.Type == "k" &&
                            <div class="badge bg-blue-700 border-0">Kids</div>
                        }
                        {product.Type == "w" &&
                            <div class="badge bg-blue-700 border-0">Womens</div>
                        }
                        <div class="badge badge-secondary">£{product.Price}</div>
                    </div>
                </div>
            </a>
        </div>
    )
}