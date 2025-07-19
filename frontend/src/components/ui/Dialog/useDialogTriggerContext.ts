import { useContext } from 'react';
import { DialogReferenceContext } from './DialogReferenceContext';

export const useDialogTriggerContext = () => useContext(DialogReferenceContext);