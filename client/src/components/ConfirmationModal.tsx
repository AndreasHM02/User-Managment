import "./ConfirmationModal.css"

type ConfirmationModalProps = {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({isOpen, title = "Confirm", message, onConfirm, onCancel}: ConfirmationModalProps) {
    if(!isOpen)
        return null;
    return(
        <div className="modal-overlay">
            <div className="modal">
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={() => onCancel()}>Cancel</button>
                    <button className="danger" onClick={() => onConfirm()}>Delete</button>
                </div>

            </div>
        </div>
    )
}