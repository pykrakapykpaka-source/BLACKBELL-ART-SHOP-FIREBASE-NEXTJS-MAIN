"use client";
import { useState } from "react";

export default function PrivacyPolicy({ setOpen }: { setOpen: Function }) {
  const [lang, setLang] = useState("pl");
  return (
    <div className="fixed w-[90vw] lg:w-max h-[60vh] left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-white rounded-xl p-6 overflow-y-scroll scrollbar z-[500]">
      <div className="flex flex-row space-x-6 mx-auto py-6 w-max">
        <button
          onClick={() => setLang("pl")}
          className="px-3 py-1 bg-purple-500 text-white font-bold rounded-md"
        >
          PL
        </button>
        <button
          onClick={() => setLang("en")}
          className="px-3 py-1 bg-purple-500 text-white font-bold rounded-md"
        >
          EN
        </button>
      </div>
      {lang === "en" && (
        <div className="prose mx-auto">
          {" "}
          <h1 className="!text-xl">Privacy Policy blackbellartstudio.pl</h1>
          <p>
            Thank you for visiting our website &quot;Blackbell&quot;. We assure
            you that your privacy is our top priority. Below you will find our
            privacy policy that describes how we collect, use, disclose, and
            protect your personal data when you use our business card website
            and contact form.
          </p>
          <h2>1. Collection of Personal Data</h2>
          <p>
            When using the contact form on our &quot;Blackbell&quot; website, we
            may collect the following personal data:
          </p>
          <ul>
            <li>
              <strong>Name:</strong> So we can address you appropriately.
            </li>
            <li>
              <strong>Email Address:</strong> For communication and responding
              to your inquiries or requests.
            </li>
            <li>
              <strong>Phone Number:</strong> Optionally, so we can contact you
              by phone if you prefer.
            </li>
            <li>
              <strong>Message Content:</strong> Information you voluntarily
              provide to us so we can respond to your inquiries.
            </li>
          </ul>
          <h2>2. Use of Personal Data</h2>
          <p>
            Your personal data is used solely to respond to your inquiries,
            questions, or requests. We will not use your personal data for any
            other purpose without your consent.
          </p>
          <h2>3. Disclosure of Personal Data</h2>
          <p>
            We commit that we will not share, sell, or exchange your personal
            data with any third parties without your consent, unless required by
            law.
          </p>
          <h2>4. Protection of Personal Data</h2>
          <p>
            Personal data is stored securely, protected against unauthorized
            access, alteration, disclosure, or destruction. All employees who
            have access to your personal data are obliged to maintain its
            confidentiality.
          </p>
          <h2>5. Rights to Personal Data</h2>
          <p>
            You have the right to access, correct, delete, or transfer your
            personal data. If you wish to exercise these rights or have any
            questions regarding our privacy policy, please contact us via email
            at:{" "}
            <a href="mailto:eliza.czer09@gmail.com">eliza.czer09@gmail.com</a>.
          </p>
          <h2>6. Changes to the Privacy Policy</h2>
          <p>
            We reserve the right to change this privacy policy at any time. Any
            changes will be posted on this page with the appropriate update
            date.
          </p>
          <p>
            Thank you for trusting our services. If you have any questions or
            concerns regarding our privacy policy, please feel free to contact
            us.
          </p>
        </div>
      )}
      {lang === "pl" && (
        <div className="prose mx-auto">
          {" "}
          <h1 className="!text-xl">
            Polityka Prywatności blackbellartstudio.pl
          </h1>
          <p>
            Dziękujemy za odwiedzenie naszej strony internetowej
            &quot;Blackbell&quot;. Zapewniamy Cię, że Twoja prywatność jest dla
            nas najwyższym priorytetem. Poniżej znajdziesz naszą politykę
            prywatności, która opisuje, jak zbieramy, używamy, ujawniamy i
            chronimy Twoje dane osobowe, gdy korzystasz z naszej strony
            wizytówki oraz formularza kontaktowego.
          </p>
          <h2>1. Zbieranie Danych Osobowych</h2>
          <p>
            Podczas korzystania z formularza kontaktowego na naszej stronie
            &quot;Blackbell&quot;, możemy zbierać następujące dane osobowe:
          </p>
          <ul>
            <li>
              <strong>Imię i Nazwisko:</strong> Abyśmy mogli się zwracać do
              Ciebie w odpowiedni sposób.
            </li>
            <li>
              <strong>Adres Email:</strong> Do komunikacji z Tobą oraz
              odpowiedzi na Twoje pytania lub prośby.
            </li>
            <li>
              <strong>Numer Telefonu:</strong> Opcjonalnie, abyśmy mogli
              skontaktować się telefonicznie, jeśli wyrazisz takie życzenie.
            </li>
            <li>
              <strong>Treść Wiadomości:</strong> Informacje, które podajesz nam
              dobrowolnie, abyśmy mogli odpowiedzieć na Twoje zapytania.
            </li>
          </ul>
          <h2>2. Użycie Danych Osobowych</h2>
          <p>
            Twoje dane osobowe są używane wyłącznie w celu udzielenia Ci
            odpowiedzi na Twoje zapytania, pytania lub prośby. Nie będziemy
            używać Twoich danych osobowych w inny sposób bez Twojej zgody.
          </p>
          <h2>3. Ujawnianie Danych Osobowych</h2>
          <p>
            Zobowiązujemy się, że nie udostępnimy, nie sprzedamy ani nie
            wymienimy Twoich danych osobowych z żadnymi osobami trzecimi bez
            Twojej zgody, chyba że będziemy zobowiązani do tego przez prawo.
          </p>
          <h2>4. Ochrona Danych Osobowych</h2>
          <p>
            Dane osobowe są przechowywane w bezpieczny sposób, chronione przed
            nieuprawnionym dostępem, zmianą, ujawnieniem lub zniszczeniem.
            Wszyscy pracownicy, którzy mają dostęp do Twoich danych osobowych,
            są zobowiązani do zachowania ich poufności.
          </p>
          <h2>5. Prawa do Danych Osobowych</h2>
          <p>
            Masz prawo do dostępu do swoich danych osobowych, ich poprawiania,
            usunięcia lub przenoszenia. Jeśli chcesz skorzystać z tych praw lub
            masz jakiekolwiek pytania dotyczące naszej polityki prywatności,
            prosimy o kontakt poprzez email pod adresem:{" "}
            <a href="mailto:eliza.czer09@gmail.com">eliza.czer09@gmail.com</a>.
          </p>
          <h2>6. Zmiany w Polityce Prywatności</h2>
          <p>
            Zachowujemy sobie prawo do zmiany tej polityki prywatności w
            dowolnym czasie. Każda zmiana zostanie opublikowana na tej stronie z
            odpowiednim oznaczeniem daty ostatniej aktualizacji.
          </p>
          <p>
            Dziękujemy za zaufanie, jakim obdarzyłeś nasze usługi. Jeśli masz
            jakiekolwiek pytania lub wątpliwości dotyczące naszej polityki
            prywatności, prosimy o kontakt.
          </p>
        </div>
      )}
      <button
        onClick={() => setOpen(false)}
        className="my-6 px-3 py-1 bg-purple-500 text-white font-bold rounded-md w-full"
      >
        {lang === "pl" ? "Zamknij" : "Close"}
      </button>
    </div>
  );
}
