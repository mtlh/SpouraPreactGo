export function Footer () {
    return (
            <footer class="footer p-10 bg-neutral bg-gradient-to-r from-blue-500 to-blue-900 text-white">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 ">
                    <div class="col-span-1 m-auto p-2">
                        <a class="btn btn-ghost font-extrabold text-transparent text-4xl bg-clip-text bg-white" href="/">Spoura</a>
                    </div>
                    <div class="col-span-2 m-auto p-2">
                        <span class="footer-title">Brands</span>
                        <br /> 
                        <a class="link link-hover p-4" href="/shop?query=Nike">Nike</a>
                        <a class="link link-hover p-4" href="/shop?query=Adidas">Adidas</a>
                        <a class="link link-hover p-4" href="/shop?query=Puma">Puma</a>
                        <a class="link link-hover p-4" href="/shop?query=Under%20Armour">Under Armour</a>
                    </div> 
                    <div class="col-span-2 m-auto p-2">
                        <span class="footer-title">Navigation</span>
                        <br />
                        <a class="link link-hover p-4" href="/shop">All Products</a>
                        <a class="link link-hover p-4" href="/about">About</a>
                        <a class="link link-hover p-4" href="/contact">Contact</a>
                    </div> 
                    <div class="col-span-2 m-auto p-2">
                        <span class="footer-title">Matthew Harvey</span> 
                        <br />
                        <a class="link link-hover p-4" href="https://github.com/mtlh" target="_blank" rel="noreferrer">Github</a>
                        <a class="link link-hover p-4" href="https://mtlh.dev/" target="_blank" rel="noreferrer">Portfolio</a>
                        <a class="link link-hover p-4" href="https://www.linkedin.com/in/mtlh/" target="_blank" rel="noreferrer">Linkedin</a>
                    </div>
                </div> 
            </footer>
    )
}