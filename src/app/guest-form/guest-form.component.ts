import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';

interface Guest {
  nama: string;
  ucapan: string;
  kehadiran: string;
}

@Component({
  selector: 'app-guest-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalComponent],
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.css']
})
export class GuestFormComponent {
  guest: Guest = {
    nama: '',
    ucapan: '',
    kehadiran: ''
  };

  isModalOpen = false;
  modalTitle = '';
  modalMessage = '';

  private readonly SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxz0NL1q5CoCnIgaCOt9mIqwlVOKQQn69aAdwUtBjvn8hL0Kl3NWTDQ3iIzKn6a9F_0/exec';
  @Output() formSubmitted = new EventEmitter<void>();
  submitForm() {
    if (!this.isFormValid()) {
      this.showModal('Error', 'Data tamu tidak lengkap. Pastikan untuk mengisi semua kolom.');
      return;
    }

    fetch(this.SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.guest)
    })
    .then(response => {
      if (response.type === 'opaque') {
        this.handleSuccess();
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (data) {
        console.log('Respon dari server:', data);
        this.handleSuccess();
      }
    })
    .catch(error => {
      console.error('Gagal mengirim data:', error);
      this.showModal('Error', `Gagal mengirim data: ${error.message}. Silakan coba lagi nanti.`);
    });
  }

  private isFormValid(): boolean {
    return !!this.guest.nama && !!this.guest.ucapan && !!this.guest.kehadiran;
  }

  private handleSuccess() {
    let message = `Terima kasih, ${this.guest.nama} Data kehadiran Anda telah terkirim.`;
  
  if (this.guest.kehadiran.toLowerCase().includes('hadir')) {
    message += ' Terima kasih juga sudah ingin hadir di pernikahan kami.';
  }
  
  this.showModal('Sukses', message);
  this.resetForm();
  this.formSubmitted.emit();
  }

  private showModal(title: string, message: string) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  private resetForm() {
    this.guest = {
      nama: '',
      ucapan: '',
      kehadiran: ''
    };
  }
}