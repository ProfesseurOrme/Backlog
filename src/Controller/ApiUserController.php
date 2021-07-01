<?php

namespace App\Controller;

use App\Entity\User;
use App\Updater\Updater;
use Doctrine\ORM\EntityManagerInterface;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface as JMS;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface as SFSerializer;
use Symfony\Contracts\Translation\TranslatorInterface;
use function Symfony\Component\String\s;

/**
 * @Route("{_locale}/api/users", name="api_user", requirements={"_locale" : "en|fr"})
 */
class ApiUserController extends AbstractApiController
{
		protected $updater;
		protected $entityManager;
		protected $translation;

		public function __construct(
			JMS $serializer,
			SFSerializer $sfSerializer,
			Updater $updater,
			EntityManagerInterface $entityManager,
			TranslatorInterface $translation
		)
		{
			parent::__construct($serializer, $sfSerializer);
			$this->updater = $updater;
			$this->entityManager = $entityManager;
			$this->translation = $translation;
		}

	/**
	 * @Route("/register", name="_register", methods={"POST"})
	 * @param Request $request
	 * @param UserPasswordEncoderInterface $encoder
	 * @return Response
	 */
    public function register(Request $request, UserPasswordEncoderInterface $encoder): Response
    {
			try {
				$user = $this->deserializeData($request->getContent(), User::class);
				$user->setRoles(["ROLE_USER"]);
				$user->setPassword($encoder->encodePassword($user, $user->getPassword()));
				$user->setCreatedAt(new \DateTime("NOW"));

				$checkIfObjectHasErrorsAndAdd = $this->updater->addObject($user);

				if(is_array($checkIfObjectHasErrorsAndAdd)){
					return $this->respondWithErrors($checkIfObjectHasErrorsAndAdd);
				}

			} catch (\Exception $exception) {
				throw new HttpException(Response::HTTP_INTERNAL_SERVER_ERROR,$this->translation->trans("user.register.error"));
			}

			return $this->respondWithCode(Response::HTTP_CREATED,$this->translation->trans("user.register.created"));
    }

		/**
		 * @Route("/check_user", name="_check_user", methods={"POST"})
		 */
    public function checkIfUserExist(Request $request) :Response
		{
			$user = $this->deserializeData($request->getContent(), User::class);

			$userRepo = $this->entityManager->getRepository(User::class)->findOneBy(["username" => $user->getUsername()]);

			if($userRepo) {
				return $this->respondWithCode(Response::HTTP_CONFLICT, $this->translation->trans("user.register.username.taken"));
			} else {
				return $this->respondWithCode(Response::HTTP_OK, $this->translation->trans("user.register.username.available"));
			}
		}

		/**
		* @Route("/", name="_update", methods={"POST"})
		*/
		public function updateUser()
		{

		}

		/**
		 * @Route("/", name="_get_admin", methods={"GET"})
		 * @Security("is_granted('ROLE_ADMIN')")
		 */
		public function getAdminUsers() : Response
		{
			$users = $this->entityManager->getRepository(User::class)->findUserWithoutRole();

			return $this->respond($users, SerializationContext::create()->setGroups(["get_user"]));
		}

		/**
		* @Route("/", name="_delete", methods={"DELETE"})
	  * @Security("is_granted('ROLE_ADMIN')")
		*/
		public function deleteUser()
		{

		}
}
