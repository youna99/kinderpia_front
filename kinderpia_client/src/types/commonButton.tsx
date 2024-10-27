export interface CommonButtonProps {
  text: string;
  onClick: () => Promise<void>;
  disabled?: boolean;
  isLoading?: boolean;
}