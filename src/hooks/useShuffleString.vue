<script lang="ts">
import { ref } from 'vue';

interface IUseSpinStringArgs {
  initial: string;
  output: string;
}

const useSpinString = (input?: IUseSpinStringArgs) => {
  const isBusy = ref(false);
  const isLeft = ref(true);

  const sleep = () => new Promise<void>((resolve) => setTimeout(resolve, 30));

  const shuffleString = async (
    el: HTMLSpanElement | HTMLParagraphElement | null,
    result: string,
    isRoleBack: boolean
  ) => {
    if (!el) return;
    const targetElement = el;
    const strArr = result.split('');
    for (let i = 0; i < 6; i += 1) {
      // Fisher Yates Algorithm
      for (let j = 0; j < strArr.length; j++) {
        const k = Math.floor(Math.random() * j + 1);
        const temp = strArr[j];
        strArr[j] = strArr[k];
        strArr[k] = temp;
      }
      targetElement.innerText = strArr.join('');
      await sleep();
    }
    if (isRoleBack) {
      targetElement.innerText = result;
    }
  };

  const onMouseEnter = async (e: MouseEvent) => {
    isLeft.value = false;
    if (isBusy.value) return;
    isBusy.value = true;

    const el = e.currentTarget as HTMLSpanElement;
    const initial = input?.initial ?? el.innerText;
    const output = input?.output ?? el.innerText;

    await shuffleString(el, output, false);

    if (isLeft.value) {
      // el.style.color = 'black';
      el.innerText = initial;
    } else {
      el.innerText = output;
      // el.style.color = 'white';
    }

    isBusy.value = false;
  };

  const onMouseLeave = (e: MouseEvent) => {
    isLeft.value = true;

    if (isBusy.value) return;
    const el = e.currentTarget as HTMLSpanElement;
    const initial = input?.initial ?? el.innerText;
    // el.style.color = 'black';
    el.innerText = initial;
  };

  return { onMouseEnter, onMouseLeave, shuffleString };
};

export default useSpinString;
</script>
