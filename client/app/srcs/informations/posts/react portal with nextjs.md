# react portal with nextjs

### portal with next
```tsx
type Props = {
  children: React.ReactNode;
};
const Portal: React.FC<Props> = ({children}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  /** 랜더 이후 동작 위함 */
  if (typeof window === 'undefined' || !mounted) return null;
  return mounted
    ? createPortal(children, document.getElementById('modal-root') as HTMLElement)
     : null;
};
export default Portal;
```

### example
```tsx
const Example = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div>
      <Portal>
        <LikeModalComponent visible={visible}>
      </Portal>
    </div>
  )
}

```