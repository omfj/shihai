import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariant = cva(
	'flex items-center justify-center bg-indigo-600 text-white px-2 text-sm hover:bg-indigo-500 transition-all rounded h-8 font-medium'
);

export type ButtonVariantProps = VariantProps<typeof buttonVariant>;
