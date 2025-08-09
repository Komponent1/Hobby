import React from 'react';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';
import { useStaff } from '../../hooks/reservatio.hook.staff';

type Props = {};
const AddStaff: React.FC<Props> = () => {
  const {createStaff} = useStaff();
  const setModalType = useModalStore((state) => state.setModalType);
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createStaff(name);
      setName('');
      setModalType(ModalType.None);
    }
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={onChangeName}
          placeholder="Enter staff name"
          required
        />
        <button type="submit">Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
