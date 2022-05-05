import '../../styles/Newsletter.scss'

const NewsLetter = () => {
    return (
        <section className="newsletter">
            <div className="newsletter_container">
                <div className="info">
                    <h2>Subscribe to our newsletter</h2>
                    <p>Recieve updates about latest products and promos when you sign up to our newsletter</p>
                </div>
                <div className="letter_form">
                    <form onClick={(e) => e.preventDefault()}>
                        <input type="email" name="email" placeholder="janedoe@gmail.com" />
                        <button>Subscribe</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default NewsLetter