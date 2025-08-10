import React, { useCallback } from 'react';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';
import { useNail } from '../../hooks/reservation.hook.nail';

const AddNail: React.FC = () => {
  const setModalType = useModalStore((state) => state.setModalType);
  const { createNail } = useNail();
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [spendMinute, setSpendMinute] = React.useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price > 0 && spendMinute > 0) {
      createNail(name, price, spendMinute);
      setName('');
      setPrice(0);
      setSpendMinute(0);
      setModalType(ModalType.None);
    }
  };

  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const onChangePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  }, []);

  const onChangeSpendMinute = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSpendMinute(Number(e.target.value));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="Enter nail service name"
          required
        />
        <input
          type="number"
          value={price}
          onChange={onChangePrice}
          placeholder="Enter nail service price"
          required
        />
        <input
          type="number"
          value={spendMinute}
          onChange={onChangeSpendMinute}
          placeholder="Enter nail service spend minute"
          required
        />
        <button type="submit">Add Nail Service</button>
      </form>
    </div>
  );
};

export default AddNail;
