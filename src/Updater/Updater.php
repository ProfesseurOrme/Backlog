<?php

	namespace App\Updater;

	use Doctrine\ORM\EntityManagerInterface;
	use Symfony\Component\HttpFoundation\Request;
	use Symfony\Component\HttpFoundation\Response;
	use Symfony\Component\HttpKernel\Exception\HttpException;
	use Symfony\Component\Serializer\SerializerInterface;
	use Symfony\Component\Validator\Validator\ValidatorInterface;

	class Updater extends ValidatorChecker {
		private $entityManager;

		public function __construct(ValidatorInterface $validator, SerializerInterface $serializer,EntityManagerInterface
		$entityManager) {
			parent::__construct($validator,$serializer);
			$this->entityManager = $entityManager;
		}

		public function addObject(object $data) {

			$errors = self::verifyData($data);

			if(is_array($errors)) {
				return $errors;
			}

			$this->entityManager->persist($data);
			$this->entityManager->flush();

			return true;
		}

		public function updateThisEntry(Request $request, object $entity) {
			$data = json_decode($request->getContent());

			$entryUpdated = 0;

			foreach ($data as $key => $value) {
				if ($key && !empty($value)) {
					$name = ucfirst($key);
					$setter = 'set'.$name;
					if (method_exists($entity, $setter)) {
						$entity->$setter($value);
						$entryUpdated ++;
					}
				}
			}

			if($entryUpdated === 0) {
				throw new HttpException(Response::HTTP_BAD_REQUEST, "No data transmitted. Please refer to the documentation @ /api/doc");
			}

			$errors = self::verifyData($entity);

			if(is_array($errors)) {
				return $errors;
			}

			$this->entityManager->flush();

			return true;
		}
	}