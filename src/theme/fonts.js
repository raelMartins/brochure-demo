import { Work_Sans, Poppins, Inter, Montserrat } from 'next/font/google';
// import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  display: 'swap',
  variable: '--font_montserrat'
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal'],
  display: 'swap',
  variable: '--font_poppins'
});

export const inter = Inter({ subsets: ['latin'], variable: '--font_inter' });

// export const segoe = localFont({
//   src: [
//     {
//       path: '../../../public/fonts/segoe-ui/segoe-ui.woff',
//       weight: '400',
//     },
//     {
//       path: '../../../public/fonts/segoe-ui/segoe-ui-semibold.woff',
//       weight: '600',
//     },
//     {
//       path: '../../../public/fonts/segoe-ui/segoe-ui-bold.woff',
//       weight: '800',
//     },
//   ],
//   variable: '--font_segoe',
// });
