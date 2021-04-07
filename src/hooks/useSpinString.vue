<script lang="ts">
import cryptoRandomString from 'crypto-random-string';
import { ref } from 'vue';

interface IUseSpinStringArgs {
  initial: string;
  output: string;
}

const useSpinString = ({ initial, output }: IUseSpinStringArgs) => {
  const isBusy = ref(false);
  const isLeft = ref(true);

  const sleep = () => new Promise<void>((resolve) => setTimeout(resolve, 30));

  const onMouseEnter = async (e: MouseEvent) => {
    isLeft.value = false;
    if (isBusy.value) return;
    isBusy.value = true;

    const el = e.currentTarget as HTMLSpanElement;

    for (let i = 0; i < 6; i += 1) {
      const r = cryptoRandomString({ length: output.length, characters: output });
      el.innerText = r;
      /* eslint-disable-next-line */
      await sleep();
    }

    if (isLeft.value) {
      el.style.color = 'black';
      el.innerText = initial;
    } else {
      el.innerText = output;
      el.style.color = 'white';
    }

    isBusy.value = false;
  };

  const onMouseLeave = (e: MouseEvent) => {
    isLeft.value = true;

    if (isBusy.value) return;

    const el = e.currentTarget as HTMLSpanElement;
    el.style.color = 'black';
    el.innerText = initial;
  };

  return { onMouseEnter, onMouseLeave };
};

export default useSpinString;
</script>
