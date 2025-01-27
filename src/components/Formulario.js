import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones necesarias
import { db } from '../firebase'; // Importa correctamente la instancia de Firestore

const Formulario = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    age: '',
    address: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  // Validar los campos del formulario
  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'El nombre es obligatorio';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'El apellido es obligatorio';
    }
    if (!formData.address) {
      newErrors.address = 'La dirección es obligatoria';
    }
    if (!formData.phone) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^\d{09}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 9 dígitos';
    }
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Agregar datos a Firestore
        await addDoc(collection(db, 'formData'), formData);
        console.log('Datos guardados en Firestore');
        setFormData({
          name: '',
          lastName: '',
          age: '',
          address: '',
          phone: '',
          email: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error al guardar los datos:', error);
      }
    }
  };

  return (
    <div className="Formulario">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
          />
          {errors.lastName && <p style={{ color: 'red' }}>{errors.lastName}</p>}
        </div>
        <div>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Edad (opcional)"
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
          />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </div>
        <div>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
          />
          {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
