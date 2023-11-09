import "./App.css";
import { cn } from "./lib/utils";
import { useState } from "react";
import z from "zod";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeToggle } from "./components/theme-toggle";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "./components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";

import { useForm } from "react-hook-form";
import { registerSchema } from "./validators/validation";

// const countryCodes = {
//   'Kazakstan': {
//     phoneCode: '+7',
//     short: 'kk'
//   },
//   'Russia': {
//     phoneCode: '+7',
//     short: 'ru'
//   },
//   'Kyrgyzstan': {
//     phoneCode: '+996',
//     short: 'kg'
//   }
// }

type RegisterForm = z.infer<typeof registerSchema>;

function App() {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      country: "Kazakstan",
      code: "",
    },
  });

  function onChangeStep() {
    if (formStep === 0) {
      form.trigger(["country", "phone"]);
      setFormStep(1);
      return;
    }
    setFormStep(0);
  }

  function onSubmit(data: RegisterForm) {
    console.log(data);
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeToggle className="absolute top-8 right-8 flex justify-end" />
        <Card className="w-full md:max-w-[600px]">
          <CardHeader>
            <CardTitle>Назначение страницы</CardTitle>
            <CardDescription>
              Авторизируйтесь по номеру телефона, чтобы войти в систему
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit, console.error)}>
                <div
                  className={cn({
                    hidden: formStep === 1,
                  })}
                >
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start mb-6">
                        <FormLabel className="pl-2">Страна</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Kazakstan">
                              <span className="flex items-center gap-8">
                                <img width={42} height={32} src="./kz.png" />
                                Казахстан
                              </span>
                            </SelectItem>
                            <SelectItem value="Russia">
                              <span className="flex items-center gap-8">
                                <img width={42} height={32} src="./ru.png" />
                                Россия
                              </span>
                            </SelectItem>
                            <SelectItem value="Kyrgyzstan">
                              <span className="flex items-center gap-8">
                                <img width={42} height={32} src="./kg.png" />
                                Киргизия
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-start mb-6">
                        <FormLabel className="pl-2">Номер телефона</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="700 000 0000"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          На этот номер придет смс с кодом подтверждения
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div
                  className={cn({
                    hidden: formStep === 0,
                  })}
                >
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ ...field }) => (
                      <FormItem className="mb-6">
                        <FormLabel className="pl-2">Введите код сюда</FormLabel>
                        <FormControl className="flex justify-center">
                          <HStack>
                            <PinInput
                              otp
                              size="md"
                              onChange={field.field.onChange}
                            >
                              <PinInputField
                                width={40}
                                className="flex items-center justify-center p-2 placeholder:text-center bg-transparent rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              />
                              <PinInputField
                                width={40}
                                className="flex items-center justify-center p-2 placeholder:text-center bg-transparent rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              />
                              <PinInputField
                                width={40}
                                className="flex items-center justify-center p-2 placeholder:text-center bg-transparent rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              />
                              <PinInputField
                                width={40}
                                className="flex items-center justify-center p-2 placeholder:text-center bg-transparent rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                              />
                            </PinInput>
                          </HStack>
                        </FormControl>
                        <FormDescription className="sr-only">
                          На этот номер придет смс с кодом подтверждения
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-8 justify-center">
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"lg"}
                    className="underline"
                    onClick={onChangeStep}
                  >
                    {formStep === 0 ? "Получить код" : "Вернуться"}
                  </Button>
                  <Button
                    type="submit"
                    size={"lg"}
                    className={cn({ hidden: formStep === 0 })}
                  >
                    Отправить код
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </NextThemesProvider>
    </div>
  );
}

export default App;
