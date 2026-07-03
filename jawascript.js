document.addEventListener("DOMContentLoaded", () => {
    // === 1. FITUR HALAMAN KERANJANG (keranjang.html) ===
    const cartItems = document.querySelectorAll(".cart-item");
    const selectAllCheckbox = document.querySelector(".select-all input[type='checkbox']");
    const itemCheckboxes = document.querySelectorAll(".cart-item input[type='checkbox']");

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const minusBtn = item.querySelector(".qty-btn.minus");
            const plusBtn = item.querySelector(".qty-btn.plus");
            const qtyInput = item.querySelector(".qty-input");
            const deleteBtn = item.querySelector(".btn-delete");

            // Fungsi Kurang Quantity
            if (minusBtn && qtyInput) {
                minusBtn.addEventListener("click", () => {
                    let currentVal = parseInt(qtyInput.value) || 1;
                    if (currentVal > 1) {
                        qtyInput.value = currentVal - 1;
                        triggerAnimate(qtyInput);
                    }
                });
            }

            // Fungsi Tambah Quantity
            if (plusBtn && qtyInput) {
                plusBtn.addEventListener("click", () => {
                    let currentVal = parseInt(qtyInput.value) || 1;
                    qtyInput.value = currentVal + 1;
                    triggerAnimate(qtyInput);
                });
            }

            // Fungsi Hapus Item dari Keranjang (Efek Fade Out)
            if (deleteBtn) {
                deleteBtn.addEventListener("click", () => {
                    if (confirm("Apakah Anda yakin ingin menghapus produk ini dari keranjang?")) {
                        item.style.transition = "all 0.5s ease";
                        item.style.opacity = "0";
                        item.style.transform = "translateX(-50px)";
                        setTimeout(() => {
                            item.remove();
                        }, 500);
                    }
                });
            }
        });

        // Fitur Checkall / Pilih Semua Barang
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener("change", () => {
                itemCheckboxes.forEach(checkbox => {
                    checkbox.checked = selectAllCheckbox.checked;
                });
            });
        }
    }

    // === 2. FITUR HALAMAN PEMBAYARAN (pembayaran.html) ===
    const paymentOptions = document.querySelectorAll(".payment-option input[type='radio']");
    const btnPembayaran = document.querySelector(".btn-pembayaran");

    if (paymentOptions.length > 0 && btnPembayaran) {
        btnPembayaran.addEventListener("click", () => {
            let selectedMethod = "";
            paymentOptions.forEach(option => {
                if (option.checked) {
                    // Ambil teks dari label pasangannya
                    selectedMethod = option.nextElementSibling.querySelector("span").textContent;
                }
            });

            if (selectedMethod) {
                alert(`Metode pembayaran "${selectedMethod}" berhasil dipilih! Melanjutkan ke konfirmasi akhir.`);
            } else {
                alert("Silakan pilih salah satu metode pembayaran terlebih dahulu.");
            }
        });
    }

    // === 3. EFEK INTERAKTIF TAMBAHAN (Berlaku di Semua Halaman) ===
    
    // Animasi kecil saat input qty berubah angka
    function triggerAnimate(element) {
        element.style.transform = "scale(1.15)";
        element.style.fontWeight = "bold";
        setTimeout(() => {
            element.style.transform = "scale(1)";
            element.style.fontWeight = "normal";
        }, 150);
    }

    // Beri efek feedback hover halus pada ikon cart di navbar
    const cartIcon = document.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("mouseenter", () => {
            cartIcon.style.transform = "rotate(-10deg) scale(1.1)";
        });
        cartIcon.addEventListener("mouseleave", () => {
            cartIcon.style.transform = "rotate(0deg) scale(1)";
        });
        cartIcon.style.transition = "transform 0.2s ease";
    }
});