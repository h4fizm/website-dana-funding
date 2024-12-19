<% 
function formatRupiah(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Format with dots
}
%>

<!DOCTYPE html>
<html lang="en" itemscope itemtype="http://schema.org/WebPage">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link rel="apple-touch-icon" sizes="76x76" href="/img/apple-icon.png" />
    <link rel="icon" type="image/png" href="/img/favicon.png" />
    <title>Donation Detail</title>
    <!-- Fonts and icons -->
    <link
      rel="stylesheet"
      type="text/css"
      href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,900"
    />
    <!-- Nucleo Icons -->
    <link href="/css/nucleo-icons.css" rel="stylesheet" />
    <link href="/css/nucleo-svg.css" rel="stylesheet" />
    <!-- Font Awesome Icons -->
    <script
      src="https://kit.fontawesome.com/42d5adcbca.js"
      crossorigin="anonymous"
    ></script>
    <!-- Material Icons -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0"
    />
    <!-- CSS Files -->
    <link
      id="pagestyle"
      href="/css/material-kit.css?v=3.1.0"
      rel="stylesheet"
    />
  </head>

  <body class="contact-us">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div
              class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
            >
              <div
                class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                style="
                  background-image: url('<%= crowdfund.crowdfund_image %>');
                  background-size: cover;
                "
                loading="lazy"
              ></div>
            </div>
            <div
              class="col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
            >
            <div
  class="card d-flex blur justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5"
  style="height: auto"
>
  <div
    class="card-header p-0 position-relative mt-2 mx-2 z-index-2 bg-transparent"
  >
    <div class="bg-dark shadow-dark border-radius-md p-3">
      <h5 class="text-white text-primary mb-0">
        Form Payment Donasi
      </h5>
    </div>
  </div>
  <div class="card-body">
    <form action="/donations/payment" method="POST">
      <!-- Input value donasi -->
      <div class="form-group">
        <label for="value" class="form-label">Jumlah Donasi</label>
        <input
          type="number"
          class="form-control"
          id="value"
          name="value"
          placeholder="Masukkan jumlah donasi (Rp)"
          required
        />
      </div>

      <!-- Pilihan metode pembayaran -->
      <div class="form-group mt-3">
        <label for="payment_method" class="form-label">Metode Pembayaran</label>
        <select
          class="form-control"
          id="payment_method"
          name="payment_method"
          required
        >
          <option value="" disabled selected>Pilih metode pembayaran</option>
          <option value="QRIS">QRIS</option>
          <option value="TF">Transfer</option>
        </select>
      </div>

      <!-- Pilihan bank (opsional jika metode transfer) -->
      <div class="form-group mt-3">
        <label for="bank" class="form-label">Bank (Jika Transfer)</label>
        <select
          class="form-control"
          id="bank"
          name="bank"
          required
        >
          <option value="" disabled selected>Pilih bank</option>
          <option value="BNI">BNI</option>
          <option value="BRI">BRI</option>
          <option value="BCA">BCA</option>
          <option value="Mandiri">Mandiri</option>
          <option value="BSI">BSI</option>
        </select>
      </div>

      <!-- Input id_crowdfund (hidden) -->
      <input
        type="hidden"
        name="id_crowdfund"
        value="<%= crowdfund.id %>"
      />

      <!-- Input id_user (hidden) -->
      <input
        type="hidden"
        name="id_user"
        value="<%= user.id %>" <!-- User ID dari sesi -->
      />

      <div class="form-group mt-4 text-center">
        <button
          type="submit"
          class="btn bg-gradient-primary btn-md"
        >
          Lakukan Pembayaran
        </button>
      </div>
    </form>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>
    </section>

    <!--   Core JS Files   -->
    <script src="/js/core/popper.min.js" type="text/javascript"></script>
    <script src="/js/core/bootstrap.min.js" type="text/javascript"></script>
    <script src="/js/plugins/perfect-scrollbar.min.js"></script>
    <script
      src="/js/material-kit.min.js?v=3.1.0"
      type="text/javascript"
    ></script>
  </body>
</html>
