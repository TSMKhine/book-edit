import { makeAble, MoveableManagerInterface, Renderer } from 'react-moveable';
import RotateButton from './RotateButton';
import DeleteButton from './DeleteButton';

const CustomButtons = makeAble('customButtons', {
  render(moveable: MoveableManagerInterface<any, any>, React: Renderer): any {
    const rect = moveable.getRect();
    const { pos3, pos4 } = moveable.state;

    return (
      <div key={'custom-buttons'}>
        <div
          style={{
            transform: `translate(${pos4[0]}px, ${pos4[1]}px) rotate(${rect.rotation}deg)`,
          }}
        >
          <RotateButton />
        </div>
        <div
          style={{
            transform: `translate(${pos3[0]}px, ${pos3[1]}px) rotate(${rect.rotation}deg)`,
          }}
        >
          <DeleteButton />
        </div>
      </div>
    );
  },
});

export default CustomButtons;
