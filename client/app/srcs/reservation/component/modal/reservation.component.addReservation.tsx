/* eslint-disable no-alert */
/* eslint-disable max-len */
import React, { useCallback, useState } from 'react';
import { useStaffStore } from '../../store/reservation.store.staff';
import { useProductStore } from '../../store/reservation.store.product';
import { useReservation } from '../../hooks/reservation.hook.reservation';
import { ModalType, useModalStore } from '../../store/reservation.store.modal';

const AddReservation: React.FC = () => {
  const staffs = useStaffStore((state) => state.staffs);
  const products = useProductStore((state) => state.products);
  const { createReservation, fetchReservations } = useReservation();
  const setModalType = useModalStore((state) => state.setModalType);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [staffId, setStaffId] = useState('');
  const [productId, setProductId] = useState('');

  const handleReset = useCallback(() => {
    setName('');
    setPhone('');
    setDate('');
    setStartTime('');
    setStaffId('');
    setProductId('');
  }, []);
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !date || !startTime || !staffId || !productId) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    const productSpendMinute = products.find((product) => product.id === productId)?.spendMinute || 0;
    await createReservation({
      name,
      phone,
      startTime: new Date(`${date} ${startTime}`).toString(),
      staffId,
      productId,
      productSpendMinute,
    });
    handleReset();
    fetchReservations({});
    setModalType(ModalType.None);
  }, [
    createReservation, name, phone, startTime, staffId, productId, handleReset, setModalType, products, fetchReservations, date,
  ]);

  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-lg">
      <div className="p-4 flex items-center justify-center bg-amber-500">
        <h1 className="text-2xl font-bold text-black">예약 추가</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col p-4 content-start">

          <div className="grid grid-cols-[1fr_2fr] mb-4 text-left">
            <label htmlFor="name" className="mr-2 text-left">예약자 이름</label>
            <input className="border-2" type="text" id="name" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid grid-cols-[1fr_2fr] mb-4 text-left">
            <label htmlFor="phone" className="mr-2">전화번호</label>
            <input
              className="border-2"
              type="tel"
              id="phone"
              placeholder="전화번호"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{11}"
            />
          </div>

          <div className="grid grid-cols-[1fr_2fr] mb-4 text-left">
            <label htmlFor="date" className="mr-2">시술 날짜</label>
            <input className="border-2" type="date" id="date" placeholder="시술 날짜" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="grid grid-cols-[1fr_2fr] mb-4 text-left">
            <label htmlFor="startTime" className="mr-2">시작 시간</label>
            <input
              className="border-2"
              type="time"
              id="startTime"
              placeholder="시작 시간"
              value={startTime}
              min="11:00"
              max="21:00"
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          <select value={staffId} onChange={(e) => setStaffId(e.target.value)} className="mb-4">
            <option value="">직원 선택</option>
            {staffs.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">네일 선택</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-center p-4">
          <button className="bg-amber-500 text-black py-2 px-4 rounded mb-4" type="submit">예약 추가</button>
        </div>
      </form>
    </div>
  );
};

export default AddReservation;
