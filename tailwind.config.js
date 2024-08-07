/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // enable dark mode
  safelist: [
    {
      pattern: /grid-cols-(4|5|6|7)/,
    },
    {
      pattern: /genre-/,
    },
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
        'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'genre-28': 'url(\'./src/assets/gif/action-movie.webp\')',
        'genre-12': 'url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RhenFlbzd6dDBzMnNyNml3ZDRxazA5M3V3ejUyMGdubWM3MmZlbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TaZh6NiCVityg/giphy.webp)',
        'genre-16': 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGt4eGF5c2RldHA1MWh2cTA2Z2djZmZkZDY1OXNxc3dtaWN4N3A4cSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2QJzmJv0PhAiI/200.webp)',
        'genre-35': 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmZoeDBnNnRvcGVjc2JvdHRzaGFqaHRhNXB3bThucWtjdWp5MXF2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0EwYucKUhwDBwCD6/giphy.webp)',
        'genre-80': 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWEzYWVtb2l0cTltZ2YzaTNzczVmemJ2YXVmZWFmbXExeHdwcjNjdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UZdNkc62OVvRm/200.webp)',
        'genre-99': 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmdhYjI3Nmc5a3prM2ppdmFiMmFyMWkxdWh3cGMzZndlbnJxM3h2ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ar9f9YKRYlhjG/200.webp)',
        'genre-18': 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3FsbW5pcDZwaW9yYmZrY2M1aXExNXlvc3J1aHhkZXo1eDFmMHlleiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FBE4ImV0ukXn2/giphy.webp)',
        'genre-10751': 'url(https://media1.tenor.com/m/C4tl2b0ZiHkAAAAd/bridge-to-terabithia.gif)',
        'genre-14': 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjNxdndpNHFnNTVwNW02aTJuMHhtNGlwbW1xZmxud3lqeXVrNmJhNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRzozg4TCBXv6QU/giphy.webp)',
        'genre-36': 'url(https://media1.tenor.com/m/1HIGq0hCXP0AAAAd/oppenheimer-oppenheimer-movie.gif)',
        'genre-27': 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDc1cTB2dnNsNmJqMHFhNTlieGg4cHYzcnFlNWluNWRmcG85Y2pqNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10TB6QfNrahdhS/giphy.webp)',
        'genre-10402': 'url(https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTJiN25jYzhoZTlpZXYxMHV5OGc5bXlqbDZuaGMycTNyZGZ3bGg5diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qRh0l0wxXNkDS/giphy.webp)',
        'genre-9648': 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHV2YmxkcW43dzVyN2puY2pybWpkcHR5dWkzNDNnOGpmaXd2a3J5ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KGXzcnBjPdOjmLnL03/giphy.webp)',
        'genre-10749': 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWx6dXZidHAycHh0Nm0wMThxeWxxeGk4OGhkbnRuNzEyOGNxd2x3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Yic5dM2urnqXzAo1iG/giphy.webp)',
        'genre-878': 'url(https://media1.tenor.com/m/bu2u5qfF9JEAAAAd/blade-runner-2049.gif)',
        'genre-53': 'url(https://media1.tenor.com/m/f1L7CaGwhwkAAAAC/look-aim.gif)',
        'genre-10770': 'url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW1jMWRkdnQyZGQ5a3phaHczbzkwZm9vMDkyZXBnNjl2MTVuNmowOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/CHYjhfBd34tCE/200.webp)',
        'genre-10752': 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExemtybTBqcGJxZXowcmdrdmpvM2hnc2J2cjh0NnEzN253Y2U5anluZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n7TyooZtZn3Ko/giphy.webp)',
        'genre-37': 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHdsbXZ5N2w5eHhsbXpjeTR0MXFlYjI5cnNhOHNyZTEwYndod240MiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ILW1fbJHW0Ndm/giphy.webp)',
        //
        'genre-10759': 'url(https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExemJubzdnNDF1NTJqdmdodDYzZnNraTJyNG4zZjUzM2I0MnRxOHBkNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI1erPMTMBFmNHi/giphy.webp)',
        'genre-10762': 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWpsdWVldWtyZDN2aDc5M25oNzRncXc0Y2RtbzUyZ3A2aTlxZHJxMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4a9t3k2VosLicILddl/giphy.webp)',
        'genre-10763': 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXVycjg4a2c2ajZuZ3k4dTJnbGhvN2dhNjNyNnlyanNsbGV1c3lhdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRvFbqtNjOikYve/giphy.webp)',
        'genre-10764': 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmx2djVvMG1temp1bG10bDg3cWRpbHVwbG95dHN6MHNiMXJlNDh4dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohc0QsfDzYRj9yZ2M/giphy.webp)',
        'genre-10765': 'url(https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazQxdXlzZzVtN3I1ZHM3aGRwM2dtczc3dHNiNDFjanFsd2VmZHpubCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oxHQwdn31M3ddjV3a/giphy.webp)',
        'genre-10768': 'url(https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRoem55YmFmYnA5dDZkdWNyMjM2cXJuYmJyNzJyMmVjd3g4eWpmdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3osxYCwut0jN4tQ5z2/giphy.webp)',
      },
      animation: {
        marquee: 'marquee 4s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      colors: {
        'primary-light': '#F7F8FC',
        'secondary-light': '#edeeef',
        'ternary-light': '#f6f7f8',

        'primary-dark': '#111',
        'secondary-dark': '#141414',
        'ternary-dark': '#222121',
        'cyan': colors.cyan,
        'fuchsia': colors.fuchsia,
        'lime': colors.lime,
        'orange': colors.orange,
        'light-blue': '#49A8ED',
        'litepie-primary': '#87D084',
        'litepie-secondary': '#B3B9CE',
        'main': '#111111',
        'primary': {
          1: '#e2f5e2',
          10: '#DCF5DB',
          20: '#87D084',
          30: '#47B843',
          40: '#2AA526',
          50: '#077104',
          60: '#20651E',
          70: '#1B6419',
          80: '#0F4E0D',
          90: '#024F00',
          100: '#023A00',
          110: '#789677',
          120: '#A4E1A2',
        },
        'golden': {
          10: '#E5DFCB',
          20: '#DED2AF',
          30: '#DBC685',
          40: '#D9BA5C',
          50: '#C7A745',
          60: '#9E7A24',
          70: '#7C6024',
          80: '#60481B',
          90: '#463C1E',
          100: '#403123',
          110: '#B8B085',
        },
        'danger': {
          10: '#FFFAFA',
          20: '#FFB8AE',
          30: '#FF8D7D',
          40: '#FF6A56',
          50: '#FF4A31',
          60: '#F82C10',
          70: '#E01B00',
          80: '#BF1700',
          90: '#991604',
          100: '#800F00',
          110: '#DD7A6D',
        },
        'info': {
          10: '#EAF6FF',
          20: '#BCDEF6',
          30: '#9FD0F3',
          40: '#74BBEF',
          50: '#49A8ED',
          60: '#2B9BEC',
          70: '#278CD6',
          80: '#2076B5',
          90: '#145381',
          100: '#0D3959',
          110: '#69A0C9',
        },
        'warning': {
          10: '#FFF3E4',
          20: '#FCD7AA',
          30: '#FFC279',
          40: '#FFAC48',
          50: '#F88F10',
          60: '#E98F25',
          70: '#D28427',
          80: '#B8721F',
          90: '#9E6116',
          100: '#845011',
          110: '#CF9C5E',
        },
        'blue-grey': {
          10: '#EDF0F5',
          20: '#E8EBF2',
          30: '#DCE1EF',
          40: '#CCD2E3',
          50: '#B3B9CE',
          60: '#9298AB',
          70: '#7A7F8E',
          80: '#616674',
          90: '#4D515E',
          100: '#353841',
          110: '#BCC0C9',
        },
        'grey': {
          10: '#E7E7E7',
          20: '#D1D1D1',
          30: '#B5B5B5',
          40: '#979797',
          50: '#808080',
          60: '#696969',
          70: '#555555',
          80: '#434343',
          90: '#232323',
          100: '#BBC2C0',
          110: '#B3B3B3',
          300: '#939494',

        },
        'disable': '#EBEFF2',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('data-active', '&[data-active=true]')
    }),
  ],
}
