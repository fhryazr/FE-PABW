function Hero() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="text-neutral-content md:text-center">
        <div className="px-5">
          <h1 className="mb-5 text-4xl md:text-5xl font-bold">
            Temukan Gaya Anda, Belanja dengan Kesenangan
          </h1>
          <p className=" text-[1.2rem] md:text-[1.5rem] mb-5">
            Selamat Datang di E-Commerce, Tempatnya Menemukan Koleksi
            Terbaru dan Gaya yang Memukau!
          </p>
          <button className="btn border-none text-white bg-green-400">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
