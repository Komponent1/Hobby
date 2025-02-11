import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Input, SimpleButton } from '../../components';
import { SelectChangeEvent } from '@mui/material/Select';
import * as style from './style';
import '@toast-ui/editor/dist/toastui-editor.css';

type Prop = {
  title: string
  setTitle: Function
  submit: (e: React.MouseEvent) => void
  categories: any[]
  categoryId: number,
  setCategoryId: Function
  openModal: () => void
}
const PostPresenter = React.forwardRef<HTMLDivElement ,Prop>(({
  submit,
  title,
  setTitle,
  categories,
  categoryId,
  setCategoryId,
  openModal
}, ref) => {

  return (
    <style.div>
      <style.sub>
        <Input label='title' value={title} onChange={(e: React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>) => setTitle(e.target.value)} />
        <FormControl fullWidth>
          <InputLabel>category</InputLabel>
          <Select
            value={String(categoryId)}
            label='category'
            onChange={(e: SelectChangeEvent) => setCategoryId(parseInt(e.target.value))}>
            {categories.map((category: any, i: number) => (
              <MenuItem key={i} value={category.id}>{category.name}</MenuItem>
            ))}
            <MenuItem value={-1} onClick={() => {
              openModal();
            }}>+ 추가</MenuItem>
          </Select>
        </FormControl>
      </style.sub>
      <div ref={ref} style={{ marginBottom: '2rem' }}/>
      <SimpleButton onClick={(e: React.MouseEvent) => submit(e)} label='POST' />
    </style.div>
  )
});

export default PostPresenter;
